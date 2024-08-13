import LuckyExcel from "luckyexcel";
async function initSheet(sheetJson) {
  if (sheetJson) {
    createSheet(sheetJson.sheets);
  } else {
    const url = "";
    if (url) {
      LuckyExcel.transformExcelToLuckyByUrl(`${url}`, "", (exportJson) => {
        if (exportJson.sheets == null || exportJson.sheets.length === 0) {
          console.log("文件读取失败!");
          return;
        }
        createSheet(exportJson.sheets);
      });
    }
  }
}
function createSheet(sheetJson) {
  try {
    // 销毁原来的表格
    window.luckysheet.destroy();
    // 重新创建新表格
    window.luckysheet.create({
      container: "excel-content", // 设定DOM容器的id
      showtoolbar: false, // 是否显示工具栏
      showinfobar: false, // 是否显示顶部信息栏
      showstatisticBar: false, // 是否显示底部计数栏
      sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
      allowEdit: true, // 是否允许前台编辑
      enableAddRow: false, // 是否允许增加行
      enableAddCol: false, // 是否允许增加列
      sheetFormulaBar: false, // 是否显示公式栏
      enableAddBackTop: false, //返回头部按钮
      data: sheetJson, //表格内容
      title: "", //表格标题
      showsheetbarConfig: {
        add: false,
        menu: true,
        sheet: true,
      },
      showsheetbar: true,
      loading: {
        text: "",
        label: "",
        image: () => {
          return ``;
        },
        imageClass: "loadingAnimation",
      },
      hook: {
        //当单元格跟新的时候，重新计算人员预算
        cellUpdated: () => {
          console.log("cellUpdated");
        },
        cellRenderAfter: () => {
          console.log("cellRenderAfter");
        },
      },
    });
  } catch (e) {
  } finally {
  }
}
