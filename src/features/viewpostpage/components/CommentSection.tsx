
type CommentSectionProps = {
    key:number;
    id: number;
    image: string;
    name: string;
    date: string;
    comment: string;
}



function CommentSection({key, image, name, date, comment} : CommentSectionProps){
    const newDate = new Date(date);

const formattedDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
})
  .format(newDate)
  .replace(",", " at");

    return(
        <>
        <div
        className="w-[343px] md:w-full flex-col pb-4 border-b-1 border-(--color-brown-300)" key={key}>
            <div className="flex gap-5">
            <img
            src={image}
            alt={name}
            className="w-11 h-11 rounded-full object-cover"/>
            <div>            
            <h4 className="text-[20px] font-semibold">{name}</h4>
            <span className="text-sm text-gray-500">
            {formattedDate}
            </span>
            </div>
            </div>
        <div>
            <p>
                {comment}
            </p>
        </div>
        </div>
        </>
    )
}

export default CommentSection