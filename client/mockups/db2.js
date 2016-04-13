##db/users/3
{
  user: {
    id: 3,
    username: "Alamu Palaniappan",
    password: 'i3jfF#F#A#A#2kfo302kf032'
    url: "alamu-palaniappan",
    email: "motion@mail.com",
    group: 'HR 40'
    image: 'http://drive.google.com/uc?export=view&id=0B4ATDW9XQ5HGMlVjV0tBb3JWOGc'
  },
  networks: [
    {
      name: 'Facebook',
      url: 'https://facebook.com/',
      value: 'jonasmike',
    },
    {
      name: 'Linkedin',
      url: 'https://linkedin.com/in/',
      value: 'mikejonas',
    }
  ],
  userInfo: [
    {
      tile: 'Preferred name',
      content: 'My preferred name is Alamu (al like in alarm - a - moo). My last name is Palaniappan.'
    },
    {
      tile: 'What were you doing before HR',
      content:'I am a mother of a 3 year old boy. So for the past three years, my life has been just around him. I take care of Marketing & Communications at his preschool. Before him, I used to work for Novell in India as a Software Developer for a couple of years. I must agree that I had a lot of fun coding then.'
    },
  ]
}

##db/users
{
  id: 2,
  username: "Matt",
  url: "i3j3k3",
  email: "m@mail.com"
  group: 'HR 40'
  image: 'http://drive.google.com/uc?export=view&id=0B4ATDW9XQ5HGMlVjV0tBb3JWOGc'
},
{
  id: 3,
  username: "Matt",
  url: "alamu-palaniappan",
  email: "m@mail.com"
  image: 'http://drive.google.com/uc?export=view&id=0B4ATDW9XQ5HGMlVjV0tBb3JWOGc'
},


// These are the available fields that the admin can add to or remeove from
##db/bioFields: [
  {
    id: 1
    tile: 'Preferred name',
  },
  {
    id: 2
    tile: 'What were you doing before hr',
  }
]

##db/userBio: [
  {
    id: 1,
    userId: 3,
    bioFieldId: 2,
    content: 'Two years ago I moved from Virginia to LA to...'
  }
  {
    id: 3,
    userId: 3,
    bioFieldId: 2,
    content: 'Two years ago I moved from Virginia to LA to...'
  }
  {
    id: 5332,
    userId: 3,
    bioFieldId: 4,
    content: 'Two years ago I moved from Virginia to LA to...'
  }
  {
    id: 3,
    userId: 3,
    bioFieldId: 6,
    content: 'Two years ago I moved from Virginia to LA to...'
  }
]
