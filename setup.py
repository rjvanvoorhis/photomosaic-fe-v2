import os


def main():
    url = os.environ.get('MOSAIC_API_URL_EXTERNAL', 'http://localhost:5000/api/v1/photomosaic')
    print(f'Looking for apiUrl at {url}')
    with open('config/config.js', 'r') as fn:
        data = fn.read().replace('{{MOSAIC_API_URL_EXTERNAL}}', url)

    with open('webpack.config.js', 'w') as fn:
        fn.write(data)   


if __name__ == '__main__':
    main()
