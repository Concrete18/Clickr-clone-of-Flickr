import requests
import xml.etree.ElementTree as ET
import json
import xmltodict


def get_photos(page):
    # get secret
    with open('seederFunctions/secret.json') as file:
        secret = json.load(file)
    
    method = 'flickr.people.getPublicPhotos'
    url = f'https://www.flickr.com/services/rest/?method={method}'
    query = {
        'api_key':secret['flickr_api_key'],
        'user_id':secret['usid'],
        'page': page,
        'per_page':'500',
        'extras':'url_l, description, tags'
        }
    response = requests.get(url, params=query)
    # saving the xml file
    with open(f'photo_data_page_{page}.xml', 'wb') as f:
        f.write(response.content)


get_photos('1')
get_photos('2')


def turn_to_json(xmlfile):
    # open the input xml file and read
    # data in form of python dictionary
    # using xmltodict module
    with open(xmlfile) as xml_file:
        data_dict = xmltodict.parse(xml_file.read())
        xml_file.close()
        # generate the object using json.dumps()
        # corresponding to json data
        json_data = json.dumps(data_dict)
        # Write the json data to output
        # json file
        file_name = xmlfile.replace('.xml', '.json')
        with open(file_name, "w") as json_file:
            json_file.write(json_data)


turn_to_json('photo_data_page_1.xml')
turn_to_json('photo_data_page_2.xml')


def get_json_data(file_path):
    with open(file_path) as file:
        data = json.load(file)
    dict_list = []
    for photo in data['rsp']['photos']['photo']:
        if '@url_l' in photo.keys():
            dict = {}
            dict['title'] = photo['@title']
            dict['imageUrl'] = photo['@url_l']
            dict['tags'] = photo['@tags']
            dict_list.append(dict)
        else:
            continue
    json_data = json.dumps(dict_list)
    with open(file_path, "w") as json_file:
        json_file.write(json_data)


get_json_data('photo_data_page_1.json')
get_json_data('photo_data_page_2.json')
