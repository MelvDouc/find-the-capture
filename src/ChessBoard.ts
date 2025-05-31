export default class ChessBoard extends HTMLElement {
  private readonly _squares: HTMLElement[];

  public constructor() {
    super();
    this._squares = Array.from({ length: 64 }, (_, index) => {
      const rank = Math.floor(index / 8);
      const file = index % 8;
      const isDarkSquare = rank % 2 === file % 2;

      const square = document.createElement("div");
      square.classList.add("square");
      isDarkSquare && square.classList.add("dark");
      square.draggable = true;

      square.addEventListener("dragstart", (e) => {
        e.dataTransfer?.setData("text/plain", square.dataset.piece as string);
      });

      square.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer!.dropEffect = "copy";
      });

      square.addEventListener("drop", (e) => {
        console.log(e);
      });

      return square;
    });

    this.classList.add("chess-board");

    for (let rank = 8 - 1; rank >= 0; rank--)
      for (let file = 0; file < 8; file++)
        this.append(this._squares[rank * 8 + file]);
  }

  private _clear(): void {
    this._squares.forEach((square) => {
      square.innerText = "";
    });
  }

  public setPieces(initials: string[]) {
    initials.forEach((initial, index) => {
      const square = this._squares[index];
      square.dataset.piece = initial;
      square.draggable = !!initial;
    });
  }
}

customElements.define("chess-board", ChessBoard);