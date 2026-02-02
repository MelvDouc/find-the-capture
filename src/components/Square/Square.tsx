import cssClasses from "./Square.module.scss";

export default function Square({ rank, file, setHighlighted }: {
  rank: number;
  file: number;
  setHighlighted: (square: HTMLElement) => void;
}) {
  const className = {
    [cssClasses.Square]: true,
    [cssClasses.dark]: rank % 2 === file % 2
  };

  const $init = (element: HTMLElement): void => {

    element.addEventListener("dragenter", () => {
      element.dataset.highlighted = "1";
      setHighlighted(element);
    });

    element.addEventListener("dragleave", () => {
      element.dataset.highlighted = "0";
    });
  };

  return (
    <div className={className} $init={$init}></div>
  ) as HTMLElement;
}