import '../scss/board.scss';
export default function BoardRow({ children } : { children: React.ReactNode }) {
    return (
        <div className="board">
            {children}
        </div>
    );
}