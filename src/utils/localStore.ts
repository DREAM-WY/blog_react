//  简单包装本地存储 供外部使用
const store = window.localStorage

class localStore {
	// 设置数据, 如果value 是object, 用使用JSON.stringfly 转成字符串
	public static set(key: string, value: any) {
		if (!store) {
			return
		}
		// 备份一份
		let v = value
		try {
			if (typeof value === "object") {
				v = JSON.stringify(v)
			}
			store.setItem(key, v)
		} catch (error) {
			// 处理错误
		}
	}
	// 直接获取 --- 原始数据
	public static get(key: string) {
		if (!store) {
			return
		}
		return store.getItem(key)
	}
	// 获取的同时 转换为JSON

	public static get2JSON(key: string) {
        if (!store) {
			return
		}
        const data = store.getItem(key)
        if(data) {
            try {
                return JSON.parse(data)
            } catch (error) {
                // do error
            }
        }
        return null
    }
    // 删除
    public static remove(key: string) {
        if (!store) {
			return
        }
        try {
            store.removeItem(key)
        } catch (error) {
            
        }
    }
}
export default localStore
