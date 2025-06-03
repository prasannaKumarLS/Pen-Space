export default function InputText(props) {
    return <div className="mb-4">
        <label htmlFor={props.field} className="block mb-1 font-medium text-gray-700">
            {props.name}
        </label>
        <input
            type={props.field === 'password' ? "password" : "text"}
            id={props.field}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={props.value}
            onChange={props.onChange}
            required
        />
    </div>
}