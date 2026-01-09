export default function ConsultantSkill(props) {
  const { skills, title } = props;

  return (
    <>
      <div className="sidebar-widget mb30 pb20 bdrs8">
        <h4 className="widget-title">{title}</h4>
        <div className="tag-list mt30">
          {skills?.map((skill, index) => (
            <a key={index}>{skill?.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
