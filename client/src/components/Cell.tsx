import '../scss/board.scss'
export default function Cell({ cell, onClick } : { cell: string, onClick: () => void }) {
    return (
        <div onClick={onClick} className="cell">
            {cell}
        </div>
    );
}
