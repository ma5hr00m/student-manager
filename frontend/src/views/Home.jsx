import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { themeAtom, addBoxAtom, editBoxAtom, studentIdAtom, studentNameAtom, studentAgeAtom, studentMajorAtom } from "../store/jotai";
import { MdDarkMode, MdLightMode, MdLanguage, MdLogout, MdRefresh, MdAdd, MdImportExport, MdSearch } from "react-icons/md";
import { useTranslation } from "react-i18next";
import axios from "axios";

import AddBox from "../components/AddBox";
import EditBox from "../components/EditBox";


export default function Home() {
    const navigate = useNavigate();
    const [studentInfo, setStudentInfo] = useState([]);
    const [addBox, setAddBox] = useAtom(addBoxAtom);
    const [editBox, setEditBox] = useAtom(editBoxAtom);

    const [theme , setTheme] = useAtom(themeAtom);
    const [ , setStudentId] = useAtom(studentIdAtom);
    const [ , setStudentName] = useAtom(studentNameAtom);
    const [ , setStudentAge] = useAtom(studentAgeAtom);
    const [ , setStudentMajor] = useAtom(studentMajorAtom);
    
    const { i18n } = useTranslation();
    const { t } = useTranslation();

    const handleTheme = async () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const handleLanguage = async () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
    }

    // Func: direct to /login, clear jwt-token in localstorage
    async function handleLogout() {
        localStorage.removeItem("lemo_token");
        navigate("/login");
    }

    // Func: request api, get latest data
    const handleRefresh = async (event) => {
        event.preventDefault();

        const response = await axios.get("http://localhost:3000/api/v2/students");

        if (response.status === 200) {
            setStudentInfo(response.data.data);
        }
    };

    // Func: save current data as a data.json file
    const handleExport = async () => {
        const data = JSON.stringify(studentInfo);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.json";
        link.click();
        URL.revokeObjectURL(url);
    };

    // Func: requset api, search items with Name parameter
    const handleSearch = async (event) => {
        event.preventDefault();
    
        const searchValue = event.target.elements.search.value;
    
        const response = await axios.get(`http://localhost:3000/api/v2/students/${searchValue}`);

        if (response.status === 200) {
            setStudentInfo(response.data.data);
        }
    };

    // Func: switch addBox Atom, display AddBox components
    const handleAddBox = async () => {
        setAddBox(addBox === ' ' ? 'hidden' : ' ');
    }

    // Func: request api, delete item with Id parameter
    const handleDelete = async (event) => {
        event.preventDefault();
    
        const trElement = event.target.closest("tr");
        const studentId = trElement.dataset.studentId;

        const response = await axios.delete(`http://localhost:3000/api/v2/students/${studentId}`);

        console.log(response.data.message);

        if (response.status === 200) {
            setStudentInfo(response.data.data);
        }
    };

    // Func: switch exitBox Atom, pass parameters and display EditBox components
    const handleEdit = async (event) => {
        setEditBox(editBox === ' ' ? 'hidden' : ' ');
        
        const trElement = event.target.closest("tr");
        setStudentId(trElement.dataset.studentId);
        setStudentName(trElement.dataset.studentName);
        setStudentAge(trElement.dataset.studentAge);
        setStudentMajor(trElement.dataset.studentMajor);
    };


    return (
        <div className='wh-full flex-c-c login-bg'>
            <div className='absolute z-10 wh-full bg-black op-20'></div>
            <main className="relative flex-col h-200 w-240 bg-[#2a2a2aff] overflow-hidden">
                <div className="relative z-100 py5 px10 flex justify-between items-center bg-[#1a1a1aff]">
                    <h2 className="m0 font-200 font-sans font-bold text-[#b7b7b7ff]">
                        {t("title")}
                    </h2>
                    <div className="flex">
                        <button className="mr-5 w9 h9 bg-[#2a2a2aff] border-none flex-c-c cursor-pointer" onClick={handleTheme} disabled>
                            <MdDarkMode className="text-[#b7b7b7ff] text-4" />
                        </button>
                        <button className="mr-5 w9 h9 bg-[#2a2a2aff] border-none flex-c-c cursor-pointer" onClick={handleLanguage}>
                            <MdLanguage className="text-[#b7b7b7ff] text-5 hover:text-[#4aab1fff]" />
                        </button>
                        <button className="w9 h9 bg-[#2a2a2aff] border-none flex-c-c cursor-pointer" onClick={handleLogout}>
                            <MdLogout className="text-[#b7b7b7ff] text-5 hover:text-[#4aab1fff]" />
                        </button>
                    </div>
                </div>
                <div className="relative z-20 flex-1 mx10 my5">
                    <div className="relative w-full h9 flex justify-between">
                        <form
                            className="relative flex space-x-2 box-border bg-transparent border-solid border-1.5 border-[#494949ff]"
                            onSubmit={handleSearch}
                        >
                            <button className="w9 h9 border-none bg-transparent flex-c-c" type="submit">
                                <MdSearch className="text-[#ffffff] text-5 cursor-pointer hover:text-[#4aab1fff]"  />
                            </button>
                            <input
                                className="bg-transparent border-none outline-none text-[#d0d0d0ff] p0 m0"
                                type="search"
                                name="search"
                                placeholder={t(`searchText`)}
                            />
                        </form>
                        <div className="flex">
                            <button className="w9 h9 mr5 box-border bg-transparent border-solid border-1.5 border-[#494949ff] flex-c-c" onClick={handleRefresh}>
                                <MdRefresh className="text-[#b7b7b7ff] text-5 cursor-pointer hover:text-[#4aab1fff]" />
                            </button>
                            <button className="w9 h9 mr5 box-border bg-transparent border-solid border-1.5 border-[#494949ff] flex-c-c" onClick={handleAddBox}>
                                <MdAdd className="text-[#b7b7b7ff] text-5 cursor-pointer hover:text-[#4aab1fff]" />
                            </button>
                            <button className="w9 h9 box-border bg-transparent border-solid border-1.5 border-[#494949ff] flex-c-c" onClick={handleExport}>
                                <MdImportExport className="text-[#b7b7b7ff] text-5 cursor-pointer hover:text-[#4aab1fff]" />
                            </button>
                        </div>
                    </div>
                    <div className="h-154 overflow-y-scroll scrollbar-hide mt-8">
                        <table className="relative w-full text-[#ddddddff]">
                            <thead>
                                <tr className="h9 bg-[#606060]">
                                    <th className="w20">{t(`tableId`)}</th>
                                    <th className="w60">{t(`tableName`)}</th>
                                    <th className="w20">{t(`tableAge`)}</th>
                                    <th>{t(`tableMajor`)}</th>
                                    <th className="w30">{t(`tableCommand`)}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentInfo.map((student) => {
                                    return (
                                        <tr
                                            className="bg-[#3a3a3a]"
                                            key={student.id}
                                            data-student-id={student.id}
                                            data-student-name={student.name}
                                            data-student-age={student.age}
                                            data-student-major={student.major}
                                        >
                                            <td className="text-center h7">{student.id}</td>
                                            <td className="text-center">{student.name}</td>
                                            <td className="text-center">{student.age}</td>
                                            <td className="text-center">{student.major}</td>
                                            <td className="flex-c-c">
                                                <button className="h7 bg-transparent text-[#d0d0d0] border-none cursor-pointer hover:text-[#4aab1fff]" onClick={handleEdit}>
                                                    {t(`tableEdit`)}
                                                </button>
                                                <button className="h7 bg-transparent text-[#d0d0d0] border-none cursor-pointer hover:text-[#4aab1fff]" onClick={handleDelete}>
                                                    {t(`tableDelete`)}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <AddBox />
                <EditBox />
            </main>
        </div>
    );
}
