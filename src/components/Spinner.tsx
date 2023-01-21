import { BarLoader } from "react-spinners";

export function Spinner(props: { loading: boolean }) {
  return (
    <div className='sweet-loading'>
      <BarLoader color={"rgb(33 150 243)"} loading={props.loading} width={300} height={3} />
    </div>
  );
}
