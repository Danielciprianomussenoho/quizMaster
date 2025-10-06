// src/components/SEO.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title = 'BrainMaster - Quizzes Educativos e Desafios Mentais',
  description = 'BrainMaster - Plataforma de quizzes educativos. Teste seu conhecimento e torne-se um mestre do saber!',
  keywords = 'quiz, conhecimento, entretenimento, educação, jogos, desafios mentais',
  image = '/og-image.png'
}) => {
  const location = useLocation();

  useEffect(() => {
    // Atualizar título da página
    document.title = title;

    // Atualizar meta tags dinamicamente
    const updateMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Meta tags básicas
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph
    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    updateOGTag('og:url', window.location.href);
    updateOGTag('og:image', image);

    // Twitter Card
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

  }, [title, description, keywords, image, location]);

  return null;
};

export default SEO;