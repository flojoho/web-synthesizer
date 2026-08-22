type Settings = {
  volume: number,
  transposeOffset: number,
  timbre: OscillatorType,
  buttonSize: number,
  spacingSize: number
}
type SettingName = keyof Settings;
type Setting = {
  [K in keyof Settings]: {
    name: K;
    defaultValue: Settings[K];
  }
}[keyof Settings];

const defaultSettings: Setting[] = [
  {
    name: 'volume',
    defaultValue: 50
  },
  {
    name: 'transposeOffset',
    defaultValue: 0
  },
  {
    name: 'timbre',
    defaultValue: 'square'
  },
  {
    name: 'buttonSize',
    defaultValue: 85
  },
  {
    name: 'spacingSize',
    defaultValue: 5
  }
];

type DefaultJSON = {
  [Key: string]: number | string
}
const defaultJSON: DefaultJSON = {};
defaultSettings.forEach(setting => {
  const { name, defaultValue } = setting;
  defaultJSON[name] = defaultValue;
});

const savedSettings = localStorage.getItem('settings');
let settings: Settings = savedSettings ? JSON.parse(savedSettings) : defaultJSON;

const get = <K extends SettingName>(key: K): Settings[K] => {
  const defaultSetting = defaultSettings.find(setting => setting.name === key);
  if(typeof defaultSetting === 'undefined') throw new Error('Setting not found');
  if(typeof settings[key] === 'undefined') return defaultSetting.defaultValue as Settings[K];

  return settings[key];
}

const set = <K extends SettingName>(key: K, value: Settings[K]) => {
  const defaultSetting = defaultSettings.find(setting => setting.name === key);
  if(typeof defaultSetting === 'undefined') throw new Error('Setting not found');
  if(typeof value !== typeof defaultSetting.defaultValue) throw new Error('Wrong value type');

  settings[key] = value;
  localStorage.setItem('settings', JSON.stringify(settings));
}

export default { get, set };
