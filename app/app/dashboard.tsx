import { useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const apiKey = "8ec239cbb28a41952a8f67f1ed8bbb08";

const fetchPopularMovies = async () => {
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Erro na requisição');
  }
  const data = await response.json();
  return data;
};

const fetchRatedMovies = async () => {
  const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1"`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Erro na requisição');
  }
  const data = await response.json();
  return data;
};

const fetchPosterMovies = async () => {
  const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR&page=1"`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Erro na requisição');
  }
  const data = await response.json();
  return data;
};


const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [poptitles, setPoptitles] = useState([]);
  const [popbackdrop, setPopbackdrop] = useState([]);
  const [popposter, setPopposter] = useState([]);
  const [ratedtitles, setRatedtitles] = useState([]);
  const [ratedbackdrop, setRatedbackdrop] = useState([]);
  const [ratedposter, setRatedposter] = useState([]);
  const [postertitles, setPostertitles] = useState([]);
  const [posterbackdrop, setPosterbackdrop] = useState([]);
  const [posterposter, setPosterposter] = useState([]);

  const structDataPop = async (movies) => {
    const moviesQuant = await movies.results.length;
    let tempTitles = [];
    let tempBackdrop = [];
    let tempPoster = [];
    for (let i = 0; i < moviesQuant; i++) {
      tempTitles.push(movies.results[i].title);
      tempBackdrop.push(`https://image.tmdb.org/t/p/w500${movies.results[i].backdrop_path}`);
      tempPoster.push(`https://image.tmdb.org/t/p/w500${movies.results[i].poster_path}`);
    }
    setPoptitles(tempTitles);
    setPopbackdrop(tempBackdrop);
    setPopposter(tempPoster);
  }

  const structDataRated = async (movies) => {
    const moviesQuant = await movies.results.length;
    let tempTitles = [];
    let tempBackdrop = [];
    let tempPoster = [];
    for (let i = 0; i < moviesQuant; i++) {
      tempTitles.push(movies.results[i].title);
      tempBackdrop.push(`https://image.tmdb.org/t/p/w500${movies.results[i].backdrop_path}`);
      tempPoster.push(`https://image.tmdb.org/t/p/w500${movies.results[i].poster_path}`);
    }
    setRatedtitles(tempTitles);
    setRatedbackdrop(tempBackdrop);
    setRatedposter(tempPoster);
  }

  const structDataPoster = async (movies) => {
    const moviesQuant = await movies.results.length;
    let tempTitles = [];
    let tempBackdrop = [];
    let tempPoster = [];
    for (let i = 0; i < moviesQuant; i++) {
      tempTitles.push(movies.results[i].title);
      tempBackdrop.push(`https://image.tmdb.org/t/p/w500${movies.results[i].backdrop_path}`);
      tempPoster.push(`https://image.tmdb.org/t/p/w500${movies.results[i].poster_path}`);
    }
    setPostertitles(tempTitles);
    setPosterbackdrop(tempBackdrop);
    setPosterposter(tempPoster);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const datapop = await fetchPopularMovies();
        await structDataPop(datapop);
        const datarated = await fetchRatedMovies();
        await structDataRated(datarated)
        const dataposter = await fetchPosterMovies();
        await structDataPoster(dataposter)
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setAttempts(attempts + 1);
      }
    };

    if (attempts < 3) {
      const timer = setTimeout(() => {
        fetchData();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setError('Não foi possível carregar os filmes');
      setIsLoading(false);
    }

  }, [attempts]);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <Text style={styles.loading}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  const carouselData = poptitles.map((title, index) => {
    return {
      title,
      backdrop: popbackdrop[index],
    };
  });

  const renderPopulares = () => {
    return (
      <View>
        <Text style={styles.popularMoviesTitle}>Populares na Netflix</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{marginLeft: -10}}>
          {poptitles.map((title, index) => (
            <View style={styles.popularMoviesItem} key={index}>
              <Image source={{uri: popposter[index]}} style={styles.popularMoviesImage} />
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
  
  const renderRateds = () => {
    return (
      <View>
        <Text style={styles.popularMoviesTitle}>Melhores avaliados</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{marginLeft: -10}}>
          {ratedtitles.map((title, index) => (
            <View style={styles.popularMoviesItem} key={index}>
              <Image source={{uri: ratedposter[index]}} style={styles.popularMoviesImage} />
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }

  const renderPosters = () => {
    return (
      <View>
        <Text style={styles.popularMoviesTitle}>Em cartazes agora</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{marginLeft: -10}}>
          {postertitles.map((title, index) => (
            <View style={styles.popularMoviesItem} key={index}>
              <Image source={{uri: posterposter[index]}} style={styles.popularMoviesImage} />
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image source={require(
          '../assets/backdrop.png',
        )} style={styles.backdrop} />
        <Pressable style={styles.watch}>
          <Text style={styles.watchText}>Assistir</Text>
        </Pressable>
      </View>
      <ScrollView>
        {!isLoading && renderPopulares()}
        {!isLoading && renderRateds()}
        {!isLoading && renderPosters()}
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap:45
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  popularMoviesContainer: {
    height: 200,
    marginTop: 20,
  },
  popularMoviesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  popularMoviesList: {
    flex: 1,
  },
  popularMoviesItem: {
    width: 120,
    marginRight: 10,
  },
  popularMoviesImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  popularMoviesTitleItem: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: '#050505',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    color: '#eee',
    fontSize: 20
  },
  error: {
    color: '#792424',
  },
  backdrop: {
    width: "100%",
    height: "100%",
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
  },
  banner: {
    width: "100%",
    height: "50%",
  },
  watch:{
    display:"flex",
    backgroundColor: "#dbd7d7",
    width: "50%",
    height: "10%",
    alignItems:"center",
    justifyContent:"center",
    textAlign: "center",
    position: "absolute",
    zIndex: 1,
    top: 360,
    left: "25%",
    borderRadius: 5
  },
  watchText:{
    color: '#000000',
  }
});

export default Dashboard