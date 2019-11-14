export default {
    palette: {
      primary: {
        main: "#ffca28",
        contrastText: "#fff",
        light: "#ffd453",
        dark: "#b28d1c"
      },
      secondary: {
        main: "#fafafa",
        contrastText: "black",
        light: "#fbfbfb",
        dark: "#afafaf"
      }
    },
    typography: {
      useNextVariants: true
    },
    frontPage: {
      form: {
        textAlign: "center"
      },
      image: {
        margin: "20px auto 20px auto"
      },
      pageTitle: {
        margin: "10px auto 10px auto"
      },
      textField: {
        margin: "10px auto 10px auto"
      },
      button: {
        marginTop: 20,
        position: "relative"
      },
      customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10
      },
      progress: {
        position: "absolute"
      }
    },
  userProfile: {
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }
  }