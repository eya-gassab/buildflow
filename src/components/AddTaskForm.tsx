import { useState } from "react";
import { Plus } from "lucide-react";


// Receives a plain string, not a Task object.
// Task construction (id generation, defaults) is the caller's responsibility.
// This keeps the form reusable across any context that needs text input.
type AddTaskFormProps = {
    onAddTask: (title: string ) => void;
};

export function AddTaskForm({ onAddTask }: AddTaskFormProps){
    const [title, setTitle] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleSubmit =(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault(); // omitting this causes a full page reload, silently wiping all React state
        const trimmed = title.trim();
        if (!trimmed) return;
        onAddTask(trimmed);
        setTitle("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100"
        >
            <input 
                type="text"
                value={title}
                onChange={handleChange}
                placeholder="Add a task..."
                className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm  text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
            />
            <button 
                type="submit"
                disabled={!title.trim()}
                className="flex items-center justify-center rounded-md bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            >
                <Plus size={16}/>
            </button>
        </form>
    );

}