const removeExcessJson =  (data) => {
  
    const json = (track) => {
        const largestAlbumImage = track.album.images.reduce(
            (largest, image) => {
            if (image.height > largest.height) return image
            return largest
            },
            track.album.images[0]
        )

        const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
            },
            track.album.images[0]
        )

        const song = {
            name: track.name,
            album: track.album.name,
            artist: track.album.artists[0].name,
            imgSm: smallestAlbumImage,
            imgLg: largestAlbumImage,
            preview: track.preview_url,
            id: track.id
        }

        return song;
    }

    let trimmedJson;

    if(data.tracks.items) {
        trimmedJson = data.tracks.items.map((track) => json(track));
    } else {
        trimmedJson = data.tracks.map((track) => json(track));
    }

    return trimmedJson;
}

module.exports = removeExcessJson