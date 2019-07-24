/* eslint-env node, mocha */
const assert = require('assert');
const { SpawnSet } = require('../src/spawnSet');

describe('SpawnSet', () => {
  const spawnSet = new SpawnSet();
  afterEach(() => spawnSet.clear());

  it('inherits from Set', () => {
    assert.equal(SpawnSet.prototype instanceof Set, true);
  });

  describe('.add', () => {
    before(() => spawnSet.add('element'));

    it('should add element correctly', () => {
      assert.equal(spawnSet.size, 1);
    });
  });

  describe('.spawn', () => {
    before(() => {
      spawnSet.add('one');
      spawnSet.add('two');
      spawnSet.add('three');
    });

    it('should spawn them in the expected order', () => {
      assert.equal(spawnSet.spawn(), 'one');
      assert.equal(spawnSet.spawn(), 'two');
      assert.equal(spawnSet.spawn(), 'three');
      assert.equal(spawnSet.spawn(), 'one');
    });
  });

});
