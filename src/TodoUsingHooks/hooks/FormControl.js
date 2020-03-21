import { useState } from "react";

export default function useFormInput(initialVal = "") {
	const [value, setValue] = useState(initialVal);

	const handleChange = event => {
		setValue(event.target.value);
	};

	const reset = () => {
		setValue("");
	};
	return [value, handleChange, reset];
}
