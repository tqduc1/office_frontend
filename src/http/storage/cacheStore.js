class CacheStore {
  remember(key, value) {
    const timeExpired = Date.now() + 1000 * 60 * 60 * 1;
    const _value = `${JSON.stringify(value)}((@))${timeExpired}`;

    localStorage.setItem(key, _value);
  }

  get(key) {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    const splitting = value.split("((@))");
    const expired = splitting[1];
    const cacheValue = splitting[0];

    if (expired <= Date.now()) {
      localStorage.removeItem(key);

      return null;
    } else {
      return cacheValue ? JSON.parse(cacheValue) : null;
    }
  }
}

const cacheStore = new CacheStore();

export default cacheStore;
