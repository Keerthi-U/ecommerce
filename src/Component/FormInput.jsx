const FormInput = ({ label, name, type = "text", defaultValue = "", size = "" }) => {
  return (
    <div className="form-control w-full mb-4">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize text-base font-medium">{label}</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required
        className={` w-full input input-bordered border-sky-500 ${size} focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />
    </div>
  );
};

export default FormInput;
