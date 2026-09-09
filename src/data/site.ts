/**
 * Dados fixos do site (links, identidade). Editar aqui sem mexer nos componentes.
 */

export const site = {
  name: "Paloma Lorenzon",
  role: "Front-End Developer",
  photo: "/paloma.jpg", // TODO: adicionar arquivo em public/paloma.jpg (retrato ~900x1100)
  email: "palomaalorenzon@gmail.com",
  links: {
    github: "https://github.com/palomagl",
    linkedin: "https://www.linkedin.com/in/palomagl",
    // Abre o compositor do Gmail já com o destinatário preenchido
    emailCompose:
      "https://mail.google.com/mail/?view=cm&fs=1&to=palomaalorenzon@gmail.com",
  },
} as const;

export const mailtoFallback = `mailto:${site.email}`;
