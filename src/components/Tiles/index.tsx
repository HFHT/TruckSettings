import './tiles.css';

interface ITile {
    tiles: string[]
    colors?: string[]
    disabled?: boolean[]
    title: string
    selected?: number | string
    chosen?: string[] | undefined
    onClick(e: string, i: number | string, f: string[]): Function | void
}

export const Tiles = ({ tiles, colors, title, onClick, disabled = [], selected = -1, chosen }: ITile) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        console.log(e.currentTarget.name, id, chosen)
        onClick(e.currentTarget.name, id, buildChosen(e.currentTarget.name, id, chosen))
    }
    if (!tiles) alert('Undefined Tile')
    return (
        <div className="tilegroup">
            {title !== '' && <span className={"tiletitle text-sm label-span"}>{title}</span>}
            <div className="tiles">
                {tiles && tiles.map((tileLabel, i: number) => (
                    <button key={i} name={tileLabel} disabled={disabled[i]} onClick={(e) => handleClick(e, i)}
                        className={`${addActiveClass(i, chosen, tileLabel)} ${(tileLabel === '') && 'tilehide'} tile text-sm buttonoutlined buttonfull buttonmiddle`}
                    >
                        {tileLabel}
                    </button>
                ))}
            </div>
        </div>
    );

    function addActiveClass(idx: number, isChosen: string[] | undefined, btn: string) {
        // console.log(idx, btn);
        if (isChosen) {
            return isSelected(btn) ? 'tileactive' : ''
        } else {
            if (typeof (selected) === 'string' ? selected === btn : selected === idx) return 'tileactive'
        }
        return ''
    }

    function isSelected(l: string) {
        let found = false
        chosen?.forEach((x) => {
            if (x === l) { found = true }
        })
        return found
    }

    function buildChosen(n: string, i: number, c: string[] | undefined) {
        console.log(n, i, c)
        if (!c) return [n]
        if (c.length === 0) {
            c.push(n)
        } else {
            if (c.indexOf(n) === -1) {
                c.push(n)
            } else {
                c.splice(c.indexOf(n), 1)
            }
        }
        // c.indexOf(n) === -1 ? c.push(n) : c.splice(c.indexOf(n),1)
        return c
    }
}


