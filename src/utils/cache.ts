class LocalCache {
    // 添加
    setCache(key: string, value: any) {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    }
    // 查找
    getCache(key: string) {
      // obj=>sting=>obj
      if(window.sessionStorage.getItem(key)!== undefined){
        const value = window.sessionStorage.getItem(key)
        if (value) {
          return JSON.parse(value)
        }
      }

    }
    // 删除
    deleteCatch(key: string) {
      window.sessionStorage.removeItem(key)
    }
    // 清理
    clearCache() {
      window.sessionStorage.clear()
    }
  }
  
  export default new LocalCache()
  
  