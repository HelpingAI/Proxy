class ProxyManager {
  static async fetchProxies(): Promise<string[]> {
    try {
      const response = await fetch('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all');
      const text = await response.text();
      return text.split('\r\n').filter(proxy => proxy);
    } catch (e) {
      console.error("Error fetching proxies:", e);
      return [];
    }
  }

  static async refreshProxies(): Promise<string[]> {
    return await this.fetchProxies();
  }

  static getProxy(proxies: string[]): string | null {
    if (proxies.length > 0) {
      return proxies[Math.floor(Math.random() * proxies.length)];
    }
    return null;
  }
}

export default ProxyManager;