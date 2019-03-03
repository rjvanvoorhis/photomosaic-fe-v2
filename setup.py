import os


def main():
    ip = os.environ.get('BROADCAST_IP', 'localhost')
    print(f'Looking for apiUrl at http://{ip}:5000/api/v1/photomosaic')
    with open('config/config.js', 'r') as fn:
        data = fn.read().replace('{{BROADCAST_IP}}', ip)

    with open('webpack.config.js', 'w') as fn:
        fn.write(data)   


if __name__ == '__main__':
    main()
