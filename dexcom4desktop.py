from pydexcom import Dexcom
import eel.browsers
import logging
import json
import sys


class Clown(Exception):
    pass


class InvalidSetting(Clown):
    pass


def print_log(msg):
    print(msg)
    logging.info(msg)


run = True
first = True
vibe_check = False


@eel.expose
def terminate():
    print_log('Terminating')
    global first
    global run
    first = False
    run = False


@eel.expose
def get_settings():
    with open('settings.json', 'r') as f:
        data = json.load(f)
    return data


@eel.expose
def change_settings(name, username, password, ous, military, unit, high, low, display_info):
    try:
        data = get_settings()
        data["name"] = name
        data["username"] = username
        data["password"] = password
        data["outside united states"] = ous
        data["military time"] = military
        data["display info"] = display_info
        data["unit (mg/dL or mmol/L)"] = unit
        data["high"] = high
        data["low"] = low
        with open('settings.json', 'w') as f:
            json.dump(data, f, indent=4)
    except Exception as e:
        print_log(e)
        return True
    return False


@eel.expose
def end_vibe_check():
    global vibe_check
    vibe_check = False


def validate_settings(data):
    try:
        if not isinstance(data["name"], str):
            raise InvalidSetting
        if not isinstance(data["username"], str):
            raise InvalidSetting
        if not isinstance(data["password"], str):
            raise InvalidSetting
        if not isinstance(data["outside united states"], bool):
            raise InvalidSetting
        if not isinstance(data["military time"], bool):
            raise InvalidSetting
        if not isinstance(data["display info"], bool):
            raise InvalidSetting
        if not isinstance(data["unit (mg/dL or mmol/L)"], str):
            raise InvalidSetting
        if not isinstance(data["high"], int):
            raise InvalidSetting
        if not isinstance(data["low"], int):
            raise InvalidSetting
    except InvalidSetting:
        return False
    return True


@eel.expose
def d4d():
    try:
        global vibe_check
        check_data = get_settings()

        valid = validate_settings(check_data)
        if not valid:
            vibe_check = True
            eel.settings_vibe_check()
            while vibe_check:
                print_log(f'Validating Settings')
                eel.sleep(2)

        vibe_check = False

        init_data = get_settings()
        username = init_data["username"]
        password = init_data["password"]
        ous = init_data["outside united states"]

        dexcom = Dexcom(username, password, ous=ous)
        last_reading_time = None
        last_reading = None
        last_delta = None
    except Exception as e:
        print_log(e)
        sys.exit()

    while run:
        try:
            bg = dexcom.get_current_glucose_reading()
        except Exception as e:
            print_log(e)
            print_log('Error getting last Glucose reading')
            eel.sleep(30)
            continue

        try:
            data = get_settings()
            name = data["name"]
            military = data["military time"]
            unit = data["unit (mg/dL or mmol/L)"]
            high = data["high"]
            low = data["low"]
        except Exception as e:
            print_log(e)
            print_log('Error retrieving settings')
            eel.sleep(30)
            continue

        if bg is None:
            print_log('No Glucose Reading')
            eel.sleep(30)
            continue

        reading = bg.mg_dl

        status = "normal"
        if reading > high:
            status = "high"
        if reading < low:
            status = "low"

        trend = bg.trend_description
        reading_time = bg.time.strftime("%H:%M") if military else bg.time.strftime("%I:%M %p")

        delta = "+-" if last_delta is None else last_delta
        if last_reading_time != bg.time and last_reading_time is not None:
            delta = reading - last_reading
            if not isinstance(delta, str):
                if delta > 0:
                    delta = f"+{delta}"
                else:
                    delta = str(delta)

        global first
        if first:
            eel.first_reading(name, reading, unit, status, trend, reading_time, delta)
            first = False
        eel.new_reading(name, reading, unit, status, trend, reading_time, delta)

        if unit == 'mg/dL':
            print_log((name, str(reading), unit, status, trend, reading_time, delta))
        else:
            try:
                delta = str(round((int(delta) * 0.0555), 1))
            except ValueError:
                pass
            print_log((name, str(round((reading * 0.0555), 1)), unit, status, trend, reading_time, delta))

        last_reading_time = bg.time
        last_reading = reading
        last_delta = delta

        eel.sleep(30)


def electron_location():
    platform = sys.platform
    if platform == "darwin":
        e = 'Electron.app/Contents/MacOS/Electron'
    else:
        e = 'electron'
    return e


def start():
    electron = electron_location()
    eel.init('web')
    eel.browsers.set_path('electron', f'node_modules/electron/dist/{electron}')
    eel.start('index.html', size=(500, 500), mode='electron')


if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG, filename="d4d_logs", filemode="a+", format="%(asctime)-15s %(levelname)-8s %(message)s")
    start()
