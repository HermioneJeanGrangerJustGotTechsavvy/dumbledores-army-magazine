
interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}

const TagButton = ({ tag, isSelected, onClick }: TagButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm transition-colors ${
        isSelected
          ? "bg-blue-500 text-white"
          : "bg-white/10 text-white/70 hover:bg-white/20"
      }`}
    >
      {tag}
    </button>
  );
};

export default TagButton;
