import { useState, useEffect } from "react";

import FormField from "../CustomForm/FormField";
import Button from "../CustomButton/CustomButton";
import MessageBox from "../MessageBox";
import Dropdown from "../CustomForm/Dropdown";
import DatePicker from "../CustomForm/DatePicker";

import { useAuthContext } from "../../context/AuthProvider";
import { useErrorHandler } from "../../context/ErrorHandlerProvider";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const QUEST_TYPE_OPTIONS = [
  { value: "epic", label: "🏰 Epic Quest"},
  { value: "main", label: "🏆 Main Quest"},
  { value: "minor", label: "🎯 Minor Quest"},
];


const QuestCreationForm = () => {
  const { handleError } = useErrorHandler();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuthContext();

  const [ form, setForm ] = useState({
    type: "epic",
    title: "",
    description: "",
    parent_quest: "no_parent_quest",
    due_date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [parentQuests, setParentQuests] = useState({main: [], minor: []});
  const [parentQuestsOptions, setParentQuestsOptions] = useState([{ value: "no_parent_quest", label: "No parent quest" }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleFormError(null, name);
    if (name === "type" && value !== form.type) {
      setForm((prev) => ({ ...prev, [name]: value, parent_quest: "no_parent_quest"}));
      updateParentQuests(value);
    } else {
      setForm((prev) => ({ ...prev, [name]: value}));
    }
  };

  const updateParentQuests = (questType) => {
    const nullOption = { value: "no_parent_quest", label: "No parent quest" };
    if (questType === "epic") {
      setParentQuestsOptions([nullOption]);
    } else if (questType === "main") {
      setParentQuestsOptions([ nullOption, ...parentQuests.main ]);
    } else if (questType === "minor") {
      setParentQuestsOptions([ nullOption, ...parentQuests.minor ]);
    }
  };

  const handleFormError = ( errorMessage, input ) => {
    setFormErrors(prev => ({...prev, [input]: errorMessage}));
  };

  useEffect(() => {
    const getCurrentQuests = async () => {
      try {
        setIsLoading(true);
        console.log("Axios instance:", axiosPrivate);
        const response = await axiosPrivate.get(`users/${auth.username}/quests?summarized=true`);
        const quests = response.data.quests;

        let parentQuestsForMain = [];
        let parentQuestsForMinor = [];

        quests.forEach(quest => {
          if (quest.type === "epic") {
            const object = {
              value: quest._id,
              label: `🏰 ${quest.title}`,
            };
            parentQuestsForMain.push(object);
            parentQuestsForMinor.push(object);
          } else if (quest.type === "main") {
            const object = {
              value: quest._id,
              label: `🏆 ${quest.title}`,
            };
            parentQuestsForMinor.push(object);
          }
        })

        setParentQuests({ main: parentQuestsForMain, minor: parentQuestsForMinor});
        console.log("getCurrentQuests finished running...");

      } catch (error) {
        const parsedError = await handleError(error, handleFormError);
        if (parsedError && parsedError?.type !== "form") {
          setErrorMessage(`${parsedError.message}. ${parsedError.details}`);
          setShowMessageBox(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (auth.username) getCurrentQuests();
  }, [auth])

  return (
    <div className="px-8 ml-10">
      { showMessageBox && errorMessage && (
        <MessageBox content={errorMessage} type="error" />
      )}
      <div className="flex flex-row mt-5 items-start">
        <div className="w-1/5 min-w-[80px] text-left mt-2">
          <p className="font-medium text-gray text-lg 2xl:text-xl tracking-wide">Quest Type<span className="text-red">*</span></p>
        </div>
        <div>
          <Dropdown
            containerStyles={"min-w-[200px]"}
            value={form.type}
            onChange={handleInputChange}
            error={formErrors.type}
            options={QUEST_TYPE_OPTIONS}
            required={true}
            name="type"
          />
        </div>
        <div>
          { form.type === "epic" && (
            <div className="text-sm text-gray tracking-wide ml-5 text-left">
              <p>Your ultimate life aspiration (Don't be afraid to dream big!).</p>
              <p>May take <span className="font-bold">5+ years/lifelong</span>.</p>
            </div>
          )}
          { form.type === "main" && (
            <div className="text-sm text-gray tracking-wide ml-5 text-left">
              <p>Large milestones supporting your Epic Quest.</p>
              <p>May take <span className="font-bold">6 months - few years</span>.</p>
            </div>
          )}
          { form.type === "minor" && (
            <div className="text-sm text-gray tracking-wide ml-5 text-left">
              <p>Short-to-mid-term projects that support a Main/Epic Quest.</p>
              <p>May take <span className="font-bold">1 day - a few months</span>.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row mt-5 items-start">
        <div className="w-1/5 min-w-[80px] text-left mt-2">
          <p className="font-medium text-gray text-lg 2xl:text-xl tracking-wide">Parent Quest</p>
        </div>
        <div>
          <Dropdown
            containerStyles={"min-w-[450px]"}
            value={form.parent_quest}
            onChange={handleInputChange}
            error={formErrors.parent_quest}
            options={parentQuestsOptions}
            required={true}
            name="parent_quest"
          />
        </div>
      </div>

      <div className="flex flex-row mt-5 items-start w-full">
        <div className="w-1/5 min-w-[80px] text-left mt-2">
          <p className="font-medium text-gray text-lg 2xl:text-xl tracking-wide">Title<span className="text-red">*</span></p>
        </div>
        <FormField 
          label=""
          name="title"
          type="text"
          value={form.title}
          onChange={handleInputChange}
          error={formErrors.title}
          required={true}
          fullWidth={true}
          maxLength={100}
          containerStyles="flex-1"
        />
      </div>

      <div className="flex flex-row mt-5 items-start w-full">
        <div className="w-1/5 min-w-[80px] text-left mt-2">
          <p className="font-medium text-gray text-lg 2xl:text-xl tracking-wide">Description</p>
        </div>
        <FormField 
          label=""
          name="description"
          type="text"
          value={form.description}
          onChange={handleInputChange}
          error={formErrors.description}
          fullWidth={true}
          maxLength={500}
          multiline={true}
          rows={10}
          containerStyles="flex-1"
        />
      </div>

      <div className="flex flex-row mt-5 items-start w-full">
        <div className="w-1/5 min-w-[80px] text-left mt-2">
          <p className="font-medium text-gray text-lg 2xl:text-xl tracking-wide">Due date</p>
        </div>
        <DatePicker
          name="due_date"
          value={form.due_date}
          onChange={handleInputChange}
          error={formErrors.due_date}
          minDate={new Date()}
          popOverDirection="up"
          containerStyles="flex-1"
        />
      </div>
      
    </div>
  )
};

export default QuestCreationForm;