import './progressbar.css';
interface IProgressbar {
    progress: number
    label?: string
}
export function ProgressBar({ progress, label = '' }: IProgressbar) {
    return (
        <div className='progress-containter'>
            <div className='progress-bar'>
                <div className='progress-bar-fill' style={{ width: `${progress ? progress : 0}%`, backgroundColor: getColor() }}>
                    <div className='progress-label'>{(Number.isFinite(progress) && progress > 0) ? ` ${progress}%  ${label}` : '0'}</div>
                </div>
            </div>

        </div>
    )
    function getColor() {
        if (progress < 40) {
            return 'red'
        } else {
            if (progress < 70) {
                return 'yellow'
            } else {
                return 'green'
            }
        }
    }
}
