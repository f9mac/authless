const convict = require('convict');
const toml = require('toml');

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["prod", "testing", "dev"],
    default: "dev",
    env: "NODE_ENV"
  },
  username: {
    doc: 'The username of the test account',
    default: '',
    format: String
  },
  password: {
    doc: 'The password of the test account',
    default: '',
    format: String,
    sensitive: true
  }
});

// Load environment dependent configuration
// this needs to be like this for parcel bundler to work correctly
const tomlEnv = require('fs').readFileSync('config/' + config.get('env') + '.toml');
config.load(toml.parse(tomlEnv));

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config

