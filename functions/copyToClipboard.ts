import toast from "react-hot-toast";

export const copyToClipboard = async () => {
  let copyText = document.getElementById("copy-text")?.innerHTML;
  try {
    copyText && (await navigator.clipboard.writeText(copyText));
    toast.success("Copied to clipboard");
  } catch (error) {
    toast.success("Failed to copy");
  }
};
