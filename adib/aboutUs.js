fetch('aboutUs.json')
  .then(response => response.json())
  .then(members => {
    const grid = document.getElementById('team-grid');
    

    members.forEach(member => {
      const wrapper = document.createElement('div');
      wrapper.className = 'team-member-wrapper';
      
      const imageCard = document.createElement('div');
      imageCard.className = 'team-image-card';
      imageCard.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
  `   ;
      
      const card = document.createElement('div');
      card.className = 'team-info-card';
      card.innerHTML = `
        <p class="member-name">${member.name}</p>
        <p class="member-matric"><b>Matric No :</b> ${member.matricno}</p>
        
      
      `;
      
      wrapper.appendChild(imageCard);
      wrapper.appendChild(card);
      grid.appendChild(wrapper);
    });
  });