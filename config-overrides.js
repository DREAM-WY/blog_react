// 此文件是create-react-app 官方推荐的customize-cra
// 实际上是扩展webpack的功能
// 所有是基于common模块化的规范
// 项目中是基于es的模块化
const { override, fixBabelImports, addLessLoader } = require("customize-cra")

module.exports = override(
	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		// style 选项为'css'表示因为css文件,true为less文件
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			"@primary-color": "#d214a2",
		},
	})
)
