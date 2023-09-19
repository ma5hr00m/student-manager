import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { editBoxAtom, studentIdAtom, studentNameAtom, studentAgeAtom, studentMajorAtom } from "../store/jotai";
import axios from "axios";

export default function EditBox() {
    const [editBox, setEditBox] = useAtom(editBoxAtom);
    const [studentId, ] = useAtom(studentIdAtom);
    const [studentName, setStudentName] = useAtom(studentNameAtom);
    const [studentAge, setStudentAge] = useAtom(studentAgeAtom);
    const [studentMajor, setStudentMajor] = useAtom(studentMajorAtom);

    const { t } = useTranslation();

    // Function: update item
    const handleEdit = async (event) => {
        event.preventDefault();
      
        const requestBody = new URLSearchParams();
        requestBody.append("name", studentName);
        requestBody.append("age", studentAge);
        requestBody.append("major", studentMajor);
      
        try {
            const response = await axios.patch(
                `http://localhost:3000/api/v2/students/${studentId}`,
                requestBody.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );
        
            console.log(response.data);
            // Trigger handleQuit function
            handleQuit();
        } catch (error) {
          console.error("Error:", error);
        }
    };

    // Funcrion: quit add box
    const handleQuit = async () => {
        setEditBox(editBox === ' ' ? 'hidden' : ' ');
    }

    return (
        <div className={`${editBox} fixed z-200 left-0 top-0 wh-full backdrop-blur-3 flex-c-c`}>
            <div className="absolute left-1/2 top-1/2 transform translate--1/2 bg-[#ffffffff] border-solid border-1 border-[#777777ff] rounded-1 flex-col">
                <form className="flex-col items-center p10" onSubmit={handleEdit}>
                    <h3 className="mt-0 mb-10">
                        {t(`editTitle`)}
                    </h3>
                    <input id="name" className="mb-4 border-1 p2" type="text" value={studentId} readOnly />
                    <input id="name" className="mb-4 border-1 p2" type="text" placeholder={t(`editName`)} value={studentName} onChange={(event) => setStudentName(event.target.value)} />
                    <input id="age" className="mb-4 border-1 p2" type="text" placeholder={t(`editAge`)} value={studentAge} onChange={(event) => setStudentAge(event.target.value)} />
                    <input id="major" className="mb-8 border-1 p2" type="text" placeholder={t(`editMajor`)} value={studentMajor} onChange={(event) => setStudentMajor(event.target.value)} />
                    <input className="mb-3 w-full p1" type="submit" value={t(`editButton`)} onClick={handleEdit} />
                    <input className="w-full p1" type="button" value={t(`editCancel`)} onClick={handleQuit} />
                </form>
            </div>
        </div>
    );
}