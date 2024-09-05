/**
 * description： electron预加载方法，进程通信
 * @author Kevin
 * @date 2023/9/19
 */

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
	/**
	 * ====================================  1、渲染进程 -> 主进程（单向）  =======================================
	 */
	/**
	 * 设置当前路由
	 * @param title
	 */
	setRouter: title => ipcRenderer.send('currentRouter', title),
	/**
	 * 窗体最小化
	 */
	setWinMin: () => ipcRenderer.send('window-min'),
	/**
	 * 窗体最大化
	 */
	setWinMax: () => ipcRenderer.send('window-max'),
	/**
	 * 关闭视窗
	 */
	setWinClose: () => ipcRenderer.send('window-close'),
	
	/**
	 * 初始化 BrowserView （视图，和webview 有点点不同）
	 * @param url
	 */
	initBrowserView:(url) => ipcRenderer.send('init-browser-view', url),
	/**
	 * 打开浏览器
	 * @param url
	 */
	openExternal: url =>ipcRenderer.send('openExternal', url),
	/**
	 * 唤起cmd脚本
	 */
	shellCmd: systemId => ipcRenderer.send('shellCmd', systemId),
	
	/**
	 * 拖拽窗体顶部
	 */
	moveApplication: position => ipcRenderer.send('moveApplication', position),
	/**
	 * 检查更新
	 */
	checkUpdate: () => ipcRenderer.send('checkUpdate'),
	/**
	 * 重新加载(web端有缓存)
	 */
	reload: () => ipcRenderer.send('reload'),
	/**
	 * ====================================== 2、渲染进程 -> 主进程(双向)  =======================================
	 */
	getVersion: () => ipcRenderer.invoke('getVersion'),
	/**
	 * ====================================== 3、主进程 -> 渲染进程  =======================================
	 */
	downloadProgress: (callback) => ipcRenderer.on('downloadProgress', callback),
	isUpdateNow: (callback) => ipcRenderer.on('isUpdateNow', callback),
	confirmUpdate: (callback) => ipcRenderer.on('confirmUpdate', callback),
	updateAvailable: (callback) => ipcRenderer.on('updateAvailable', callback),
	updateNotAvailable: (callback) => ipcRenderer.on('updateNotAvailable', callback),
	updateError: (callback) => ipcRenderer.on('updateError', callback),
})
