const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCmdvAxEJ14EvXdASKbodj1Q&part=snippet%2Cid&order=date&maxResults=5';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9e7a867a6amshdb5370f588b5e98p134808jsn062c8be61af3',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario
async function fetchData(urlApi) { //siempre async antes de function
    const response = await fetch(urlApi, options); //hacemos uso del fetch() y solo por esta vez le pasamos la opciones 
    const data = await response.json(); //estructura de los datos transformandolos en json
    return data; //retorna la información de la API que estamos solicitando
    }

    (async () => {
        try {
            const videos = await fetchData(API);
            let view = `
            ${videos.items.map(video => `
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700" style="color:white;">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            `).slice(0, 4).join('')}
            `;
            content.innerHTML = view;
        } catch(error){
            console.log(error);
        }
    })();