import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="text-center py-12 md:py-16 max-w-3xl mx-auto">
      <p className="text-sm uppercase tracking-[6px] text-muted mb-4 font-light">
        WORN ONCE. NEVER FORGOTTEN.
      </p>
      <h1 className="text-3xl md:text-5xl font-serif font-medium leading-tight mb-6 text-cream-light">
        YOUR SCENT IS THE <span className="text-gold">FIRST THING</span> THEY REMEMBER.
      </h1>
      <p className="text-base md:text-lg text-muted-text leading-relaxed max-w-2xl mx-auto mb-8">
        Before your words. Before your presence fully fills the room, your fragrance already has.
        Perfumology was created for those who understand that true elegance is never seen first.
        It is felt. It lingers in doorways, in handshakes, in the memory of everyone who was lucky enough to be near you.
        This is not a fragrance you wear for others. You wear it because you know exactly who you are.
        And now, so will they.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/shop" className="btn-primary">Shop now</Link>
        <Link to="/shop" className="btn-secondary">Explore the collection</Link>
      </div>
    </section>
  );
};