import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
    	escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                title: "Student Manager",

                searchText: "Search with name",
                tableId: "ID",
                tableName: "Name",
                tableAge: "Age",
                tableMajor: "Major",
                tableCommand: "Command",
                tableEdit: "Edit",
                tableDelete: "Delete",

                addTitle: "Add Student",
                addName: "Name",
                addAge: "Age",
                addMajor: "Major",
                addButton: "Add",
                addCancel: "Cancel",

                editTitle: "Edit Info",
                editName: "Name",
                editAge: "Age",
                editMajor: "Major",
                editButton: "Update",
                editCancel: "Cancel",                
            }
        },
        zh: {
            translation: {
                title: "学生管理系统",

                searchText: "根据姓名进行搜索",
                tableId: "ID",
                tableName: "姓名",
                tableAge: "年龄",
                tableMajor: "专业",
                tableCommand: "控制",
                tableEdit: "编辑",
                tableDelete: "删除",

                addTitle: "添加学生",
                addName: "姓名",
                addAge: "年龄",
                addMajor: "专业",
                addButton: "添加",
                addCancel: "取消",

                editTitle: "编辑信息",
                editName: "姓名",
                editAge: "年龄",
                editMajor: "专业",
                editButton: "更新",
                editCancel: "取消",
            }
        }
    }
  });

export default i18n;