const fs = require('fs');
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
    format: String,
    env: "AUTHLESS_TEST_USERNAME"
  },
  password: {
    doc: 'The password of the test account',
    default: '',
    format: String,
    env: "AUTHLESS_TEST_PASSWORD",
    sensitive: true
  }
});

// Load environment dependent configuration
// this needs to be like this for parcel bundler to work correctly
const configPath = `config/${config.get('env')}.toml`;
if (fs.existsSync(configPath)) {
  const tomlEnv = fs.readFileSync(configPath);
  config.load(toml.parse(tomlEnv));
}

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config
