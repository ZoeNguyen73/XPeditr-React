const getQuestIconType = (questType) => {
  let icon;
  let typeName;
  if (questType === "epic") {
    typeName = "Epic Quest"
    icon = "🏰";
  } else if (questType === "main") {
    typeName = "Main Quest";
    icon = "🏆";
  } else if (questType === "minor") {
    typeName = "Minor Quest";
    icon = "🎯";
  }

  return { icon, typeName };
};

export default getQuestIconType;