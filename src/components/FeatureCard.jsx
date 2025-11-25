const FeatureCard = ({ title, items ,Icon}) => {
  return (
    <div className="card">
      <h3>{Icon}{title}</h3>
      <ul>
        {items.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  )
}


export default FeatureCard