import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { addBoxAtom } from "../store/jotai";
import axios from "axios";

export default function AddBox() {
    const [addBox, setAddBox] = useAtom(addBoxAtom);
    
    const { t } = useTranslation();

    // Function: add new item
    const handleAdd = async (event) => {
        event.preventDefault();
      
        const form = event.target;
        const name = form.elements.name.value;
        const age = form.elements.age.value;
        const major = form.elements.major.value;
      
        const requestBody = new URLSearchParams();
        requestBody.append("name", name);
        requestBody.append("age", age);
        requestBody.append("major", major);
      
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v2/students",
                requestBody.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );
        
            console.log(response.data);

            // Clear input fields
            form.elements.name.value = "";
            form.elements.age.value = "";
            form.elements.major.value = "";

            // Trigger handleQuit function
            handleQuit();
        } catch (error) {
          console.error("Error:", error);
        }
    };

    // Funcrion: quit add box
    const handleQuit = async () => {
        console.log(addBox);
        setAddBox(addBox === ' ' ? 'hidden' : ' ');
    }

    return (
        <div className={`${addBox} fixed z-200 left-0 top-0 wh-full backdrop-blur-3 flex-c-c`}>
            <div className="absolute left-1/2 top-1/2 transform translate--1/2 bg-[#ffffffff] border-solid border-1 border-[#777777ff] rounded-1 flex-col">
                <form className="flex-col items-center p10" onSubmit={handleAdd}>
                    <h3 className="mt-0 mb-10">
                        {t(`addTitle`)}
                    </h3>
                    <input id='name' className="mb-4 border-1 p2" type="text" placeholder={t(`addName`)} />
                    <input id='age' className="mb-4 border-1 p2" type="text" placeholder={t(`addAge`)} />
                    <input id='major' className="mb-8 border-1 p2" type="text" placeholder={t(`addMajor`)} />
                    <input className="mb-3 w-full p1" type="submit" value={t(`addButton`)} />
                    <input className="w-full p1" type="button" value={t(`addCancel`)} onClick={handleQuit} />
                </form>
            </div>
        </div>
    );
}