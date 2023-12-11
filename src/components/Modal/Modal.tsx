import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddRecipe } from "../../hooks/useRecipes";

interface ModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "This field is required" }),
  ingredients: z
    .object({
      ingredient: z.string().min(1, { message: "This field is required" }),
    })
    .array()
    .nonempty({ message: "Recipe must have at least one ingredient" }),
  instructions: z
    .object({
      step: z.string().min(1, { message: "This field is required" }),
    })
    .array()
    .nonempty({ message: "Recipe must have at least one step" }),
});

type Recipe = z.infer<typeof formSchema>;

const Modal: React.FC<ModalProps> = ({ isOpen, onCloseModal }) => {
  const mutation = useAddRecipe();

  const form = useForm<Recipe>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ingredients: [{ ingredient: "" }],
      instructions: [{ step: "" }],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;
  const ingredients = useFieldArray({
    control,
    name: "ingredients",
  });
  const instructions = useFieldArray({
    control,
    name: "instructions",
  });

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<Recipe> = (data) => {
    const ingredients = data.ingredients.map((item) => item.ingredient);
    const instructions = data.instructions.map((item) => item.step);
    const payload = { name: data.name, ingredients, instruction: instructions };
    mutation.mutate(payload);
    reset();
    onCloseModal();
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-md p-5 max-w-[600px] w-2/3 h-[425px] overflow-y-auto">
      <button
        onClick={onCloseModal}
        className="text-4xl absolute top-0 right-2"
      >
        &times;
      </button>
      <h3 className="text-2xl font-semibold mb-6">Add new Recipe</h3>
      {/* modal content */}
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end items-center flex-wrap">
          <label htmlFor="name" className="basis-1/3">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            placeholder="Input Recipe name..."
            className="basis-2/3 w-full p-1 rounded-md pl-2 outline-none"
          />
          <p className="text-red-400 basis-2/3 w-full self-end">
            {errors.name?.message}
          </p>
        </div>

        {/* Ingredients */}
        <h4 className="text-xl font-semibold mt-1">Ingredients</h4>
        {ingredients.fields.map((ing, i) => (
          <div
            key={ing.id}
            className="flex justify-end items-center mb-2 flex-wrap"
          >
            <label htmlFor="" className="basis-1/3">
              Ingredients {i + 1}
            </label>
            <input
              className="flex-1 p-1 rounded-md pl-2 outline-none"
              type="text"
              {...register(`ingredients.${i}.ingredient` as const)}
              placeholder={`ingredient ${i + 1}`}
            />
            <button
              onClick={() => ingredients.remove(i)}
              className="text-red-500 text-5xl font-thin font-[arial] leading-[0]"
            >
              &times;
            </button>
            <p className="text-red-400 basis-2/3 w-full">
              {errors.ingredients?.[i]?.ingredient?.message}
            </p>
          </div>
        ))}
        <p className="text-red-400">
          {errors.ingredients?.root?.message || errors.ingredients?.message}
        </p>

        <button
          type="button"
          onClick={() => ingredients.append({ ingredient: "" })}
          className="bg-sky-300 rounded-md self-center mt-2 px-2 py-1"
        >
          Add ingredient
        </button>

        {/* Instruction */}
        <h4 className="text-xl font-semibold mt-1">Instructions</h4>
        {instructions.fields.map((instruction, i) => (
          <div
            key={instruction.id}
            className="flex justify-end items-center mb-2 flex-wrap"
          >
            <label htmlFor="" className="basis-1/3">
              step {i + 1}
            </label>
            <input
              className="flex-1 p-1 rounded-md pl-2 outline-none"
              type="text"
              {...register(`instructions.${i}.step` as const)}
              placeholder={`step ${i + 1}`}
            />
            <button
              onClick={() => instructions.remove(i)}
              className="text-red-500 text-5xl font-thin font-[arial] leading-[0]"
            >
              &times;
            </button>
            <p className="text-red-400 basis-2/3 w-full">
              {errors.instructions?.[i]?.step?.message}
            </p>
          </div>
        ))}
        <p className="text-red-400">
          {errors.instructions?.root?.message || errors.instructions?.message}
        </p>

        <button
          type="button"
          onClick={() => instructions.append({ step: "" })}
          className="bg-sky-300 rounded-md self-center mt-2 px-2 py-1"
        >
          Add step
        </button>

        {/* Action Button */}
        <div className="flex gap-4 mt-6 [&>*]:rounded-md [&>*]:px-4 [&>*]:py-2">
          <button type="submit" className="bg-sky-300">
            {mutation.isLoading ? "Loading..." : "Add"}
          </button>
          <button onClick={onCloseModal} className="bg-red-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
