import background from 'assets/images/background1.png';

export default function Banner() {
  return (
    <section
      className='flex bg-cover bg-center bg-no-repeat min-h-screen w-full'
      style={{ backgroundImage: `url(${background})` }}
    >
    </section>
  );
}
