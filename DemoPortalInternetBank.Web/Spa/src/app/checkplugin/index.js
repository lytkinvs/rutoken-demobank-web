import React from 'react';

import {
    NoSupportOsError,
    NoSupportBrowserError,
    NoSupportPlatformError,
    NoInstalledPluginError,
    NoSupportBrowserVersionError,
    NoSupportPluginVersionError,
} from 'rutoken-plugin-bootstrap/supportError';

import IncorrectLoad from './IncorrectLoad';
import NoSupportPlatform from './NoSupportPlatform';
import NoSupportOs from './NoSupportOs';
import NoSupportBrowser from './NoSupportBrowser';

import NoPluginForOs from './NoPluginForOs';
import NoPluginWithExtension from './NoPluginWithExtension';
import NoSupportCurrentBrowserVersion from './NoSupportCurrentBrowserVersion';
import NoSupportPluginVersion from './NoSupportPluginVersion';


const NoPluginForOsRender = (error) => {
    const { name } = error.os;
    const { name: browserName } = error.browser;

    if (name === 'Windows') {
        if (browserName === 'Firefox' || browserName === 'Internet Explorer') {
            const link = 'https://www.rutoken.ru/support/download/get/rtPlugin-win.html';
            return NoPluginForOs(link);
        }
        if (browserName === 'Microsoft Edge') {
            const link = 'https://www.microsoft.com/en-us/p/adapter-rutoken-plugin/9p4kb5pz2vvx';
            return NoPluginForOs(link);
        }
    }

    if (name === 'Linux') {
        if (browserName === 'Firefox') {
            const link = 'https://www.rutoken.ru/support/download/rutoken-plugin/';
            return NoPluginForOs(link);
        }
    }

    if (name === 'macOS') {
        const link = 'https://www.rutoken.ru/support/download/get/rtPlugin-mac.html';
        if (browserName === 'Firefox') {
            return NoPluginForOs(link, true);
        }
        if (browserName === 'Safari') {
            return NoPluginForOs(link, false, error.browser.version.split('.')[0]);
        }
    }

    return (
        <NoPluginWithExtension needExtension={error.needExtension} browserName={browserName} os={name} />
    );
};

const NoPlugin = (error) => (
    <div className="main">
        <div className="main__wrapper main__settings d-flex flex-column justify-content-start align-items-start p-2">
            <div className="aboutservice w-100 d-flex flex-column justify-content-center align-items-center">
                <span className="aboutservice__title mb-1 w-100">
                    Для работы в Демобанке вам понадобятся
                </span>
            </div>

            {NoPluginForOsRender(error)}

            <div className="settings__divider" />

            <div className="settings__info">
                <span>
                    Модули необходимы для получения доступа к хранилищу Рутокен
                    <br />
                    и работы с сертификатами и ключами
                </span>
            </div>
        </div>
    </div>
);

const CheckPlugin = ({ error }) => {
    if (error instanceof NoSupportPlatformError) {
        return NoSupportPlatform();
    }

    if (error instanceof NoSupportOsError) {
        return NoSupportOs(error.supportedOs);
    }

    if (error instanceof NoSupportBrowserError) {
        return NoSupportBrowser(error.browser, error.supportedBrowsers);
    }

    if (error instanceof NoInstalledPluginError) {
        return NoPlugin(error);
    }

    if (error instanceof NoSupportBrowserVersionError) {
        return NoSupportCurrentBrowserVersion(error.browser.name, error.supportedBrowsers);
    }

    if (error instanceof NoSupportPluginVersionError) {
        return NoSupportPluginVersion(error.os);
    }

    return IncorrectLoad();
};

export default CheckPlugin;
