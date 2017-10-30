/*
 * @Author: Vir Desai 
 * @Date: 2017-10-13 22:33:09 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-16 00:14:24
 */

/**
 * API Config
 */

export default {
    // The URL we're connecting to
    hostname:   'http://192.168.42.1:3000/api', // deployment
    ws:         'ws://192.168.42.1:3000',
    location:   'https://freegeoip.net/json/',
    weatherURL: 'http://api.openweathermap.org',
    weatherKey: 'e35a673236f33d34d6db9c21e1756cea', //https://openweathermap.org/appid

    // Map shortnames to the actual endpoints, so that we can
    // use them like so: AppAPI.ENDPOINT_NAME.METHOD()
    //  NOTE: They should start with a /
    //    eg.
    //    - AppAPI.recipes.get()
    //    - AppAPI.users.post()
    //    - AppAPI.favorites.patch()
    //    - AppAPI.blog.delete()
    endpoints: new Map([
        ['pin', '/pin'],
        ['passcode', '/passcode'],
        ['sensors', '/sensors'],
        ['modes', '/modes'],
        ['alarm', '/alarm'],
        ['alarmState', '/alarmState'],
        ['resetSensor', '/resetSensor'],
    ]),
    
    weatherEndpoints: new Map([
        ['weather', '/data/2.5/weather']
    ]),
};
