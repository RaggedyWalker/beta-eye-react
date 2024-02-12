import LogoImg from '@/assets/logo200px.svg';

export default function Logo() {
  return (
    <img
      src={LogoImg}
      style={{ width: '110px', cursor: 'pointer' }}
      alt="beta eye"
    />
  );
}
