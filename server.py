from flask import Flask
from flask import render_template, redirect
from flask import Response, request, jsonify
app = Flask(__name__)

# Video URL - https://youtu.be/spuJfcKAZFk

# DATA
data = {
    "1": {
        "id": "1",
        "name": "Debian",
        "logo": "https://www.debian.org/Pics/debian-logo-1024x576.png",
        "description": "Debian is a venerable and widely respected Linux distribution known for its stability, reliability, and commitment to free and open-source software principles. It boasts a vast repository of precompiled software packages, making it a versatile choice for users ranging from novices to experienced sysadmins. Debian's package management system, APT (Advanced Package Tool), simplifies software installation and updates. One of its defining features is its strict adherence to the Debian Free Software Guidelines (DFSG), ensuring that all included software is free to use, modify, and distribute. With multiple officially supported architectures and a vibrant community, Debian continues to be a cornerstone of the open-source ecosystem, powering everything from personal computers to enterprise servers.",
        "release_year": 1993,
        "expert_rating": 8,
        "family": "Debian",
        "package_manager": "APT",
        "architectures": [
            "aarch64",
            "armel",
            "armhf",
            "i386",
            "i686",
            "loongarch64",
            "mipsel",
            "ppc64el",
            "s390x",
            "x86_64"
        ],
        "default_desktop": "GNOME",
        "upgrade_style": "Stable",
        "init_system": "Systemd",
        "experience_level": "Intermediate"
    },
    "2": {
        "id": "2",
        "name": "Arch Linux",
        "logo": "https://archlinux.org/static/logos/archlinux-logo-dark-90dpi.ebdee92a15b3.png",
        "description": "Arch Linux is a minimalist and highly customizable Linux distribution renowned for its simplicity, flexibility, and rolling-release model. It offers a lightweight base system and provides users with the freedom to tailor their installations to their specific needs and preferences, making it popular among enthusiasts and power users. Arch's package manager, Pacman, simplifies software management with straightforward commands for installation, updates, and removal. Its \"Arch User Repository\" (AUR) extends its software availability by allowing users to easily build and share packages not included in the official repositories. With a focus on simplicity, transparency, and user-centric design, Arch Linux empowers users to create bespoke computing environments tailored to their exact requirements, making it a favorite among those who relish full control over their systems.",
        "release_year": 2002,
        "expert_rating": 10,
        "family": "Arch",
        "package_manager": "pacman",
        "architectures": [
            "x86_64"
        ],
        "default_desktop": "None",
        "upgrade_style": "Rolling",
        "init_system": "Systemd",
        "experience_level": "Expert"
    },
    "3": {
        "id": "3",
        "name": "Ubuntu",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ubuntu-logo-2022.svg/250px-Ubuntu-logo-2022.svg.png",
        "description": "Ubuntu is a popular Linux distribution known for its user-friendly interface and extensive community support. Based on Debian, Ubuntu offers a balance between stability and cutting-edge features. It comes with the GNOME desktop environment by default and provides access to a vast array of software through its Software Center. Ubuntu's package manager, APT, simplifies software installation and updates, while its Long Term Support (LTS) releases ensure stability for enterprise users. With a focus on usability and accessibility, Ubuntu appeals to both beginners and experienced users alike.",
        "release_year": 2004,
        "expert_rating": 5,
        "family": "Debian",
        "package_manager": "APT",
        "architectures": [
            "amd64",
            "arm64",
            "ppc64el",
            "s390x"
        ],
        "default_desktop": "GNOME",
        "upgrade_style": "Stable",
        "init_system": "Systemd",
        "experience_level": "Beginner"
    },
    "4": {
        "id": "4",
        "name": "CentOS",
        "logo": "https://wiki.centos.org/attachments/ArtWork(2f)Brand(2f)Logo/centos-logo-light.png",
        "description": "CentOS is a Linux distribution derived from the sources of Red Hat Enterprise Linux (RHEL). Known for its stability and long-term support, CentOS is a popular choice for servers and enterprise environments. It provides a robust and secure platform for hosting web services, databases, and other critical applications. CentOS uses the YUM package manager for software management and follows a predictable release cycle. With its focus on reliability and compatibility, CentOS offers a dependable solution for businesses and organizations seeking enterprise-grade Linux distributions.",
        "release_year": 2004,
        "expert_rating": 6,
        "family": "RHEL",
        "package_manager": "RPM",
        "architectures": [
            "x86_64",
            "aarch64",
            "ppc64le"
        ],
        "default_desktop": "GNOME",
        "upgrade_style": "Stable",
        "init_system": "Systemd",
        "experience_level": "Expert"
    },
    "5": {
        "id": "5",
        "name": "Fedora",
        "logo": "https://fedoraproject.org/assets/images/logos/fedora-blue.png",
        "description": "Fedora is a cutting-edge Linux distribution sponsored by Red Hat, known for its focus on innovation and emerging technologies. It serves as a testbed for features that may eventually be incorporated into Red Hat Enterprise Linux (RHEL). Fedora offers a variety of desktop environments, including GNOME, KDE Plasma, and Xfce, catering to diverse user preferences. With its short release cycle, Fedora provides access to the latest software and features, making it an ideal choice for enthusiasts and developers interested in bleeding-edge technology.",
        "release_year": 2003,
        "expert_rating": 7,
        "family": "RHEL",
        "package_manager": "RPM",
        "architectures": [
            "x86_64",
            "aarch64",
            "ppc64le"
        ],
        "default_desktop": "GNOME",
        "upgrade_style": "Stable",
        "init_system": "Systemd",
        "experience_level": "Intermediate"
    },
    "6": {
        "id": "6",
        "name": "openSUSE",
        "logo": "https://en.opensuse.org/images/f/f2/Button-laptop-colour.png",
        "description": "openSUSE is a community-driven Linux distribution sponsored by SUSE Linux GmbH, known for its stability, ease of use, and strong support for graphical interfaces. It offers two main editions: Leap, a regular release based on the stable SUSE Linux Enterprise (SLE) codebase, and Tumbleweed, a rolling-release distribution with the latest packages and updates. openSUSE provides a choice of desktop environments, including KDE Plasma, GNOME, and Xfce, along with powerful system administration tools like YaST. With its focus on flexibility and user-friendliness, openSUSE appeals to a broad audience, from beginners to advanced users and system administrators.",
        "release_year": 2005,
        "expert_rating": 8,
        "family": "SUSE",
        "package_manager": "RPM",
        "architectures": [
            "x86_64",
            "aarch64",
            "ppc64le"
        ],
        "default_desktop": "KDE Plasma",
        "upgrade_style": "Rolling",
        "init_system": "Systemd",
        "experience_level": "Intermediate"
    },
    "7": {
        "id": "7",
        "name": "Gentoo",
        "logo": "https://www.gentoo.org/assets/img/logo/gentoo-logo.svg",
        "description": "Gentoo Linux is a source-based Linux distribution known for its flexibility, performance, and customization options. Unlike binary distributions, Gentoo allows users to compile software from source code, enabling optimization for specific hardware architectures and user preferences. Its Portage package manager facilitates the installation and management of software packages, dependencies, and updates. Gentoo follows a rolling-release model, ensuring that users have access to the latest software and security updates. With its emphasis on performance tuning and hands-on system administration, Gentoo is favored by experienced users and enthusiasts seeking maximum control over their systems.",
        "release_year": 2002,
        "expert_rating": 9,
        "family": "Gentoo",
        "package_manager": "Portage",
        "architectures": [
            "i486",
            "i586",
            "i686",
            "x86_64",
            "x86-64-v3",
            "alpha",
            "arm",
            "hppa",
            "ia64",
            "mips",
            "powerpc",
            "ppc64",
            "sparc64"
        ],
        "default_desktop": "None",
        "upgrade_style": "Rolling",
        "init_system": "OpenRC",
        "experience_level": "Expert"
    },
    "8": {
        "id": "8",
        "name": "Manjaro",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Manjaro_logo_text.svg/375px-Manjaro_logo_text.svg.png",
        "description": "Manjaro Linux is a user-friendly Linux distribution based on Arch Linux, designed to provide an accessible entry point to the Arch ecosystem. It offers a balance between cutting-edge software and stability, making it suitable for both beginners and experienced users. Manjaro provides multiple desktop environments, including Xfce, KDE Plasma, and GNOME, allowing users to customize their computing experience. Its package manager, Pacman, simplifies software installation and updates, while the Arch User Repository (AUR) extends its software availability. With its focus on simplicity, usability, and community support, Manjaro provides an inviting environment for users interested in exploring the benefits of Arch Linux.",
        "release_year": 2011,
        "expert_rating": 5,
        "family": "Arch",
        "package_manager": "pacman",
        "architectures": [
            "aarch64",
            "x86_64"
        ],
        "default_desktop": "KDE Plasma",
        "upgrade_style": "Rolling",
        "init_system": "Systemd",
        "experience_level": "Beginner"
    },
    "9": {
        "id": "9",
        "name": "Slackware",
        "logo": "http://www.slackware.com/grfx/shared/slackware_traditional_website_logo.png",
        "description": "Slackware is one of the oldest surviving Linux distributions, known for its simplicity, stability, and adherence to Unix-like principles. Founded by Patrick Volkerding in 1993, Slackware maintains a minimalist philosophy, providing users with a basic but functional Linux environment. It uses the traditional sysvinit init system and offers a choice of desktop environments, including KDE Plasma and Xfce. Slackware's package manager, pkgtool, simplifies software management, while the SlackBuilds repository allows users to easily compile and install additional software. With its emphasis on simplicity, reliability, and traditional Unix practices, Slackware appeals to users seeking a classic Linux experience.",
        "release_year": 1993,
        "expert_rating": 8,
        "family": "Slackware",
        "package_manager": "TXZ",
        "architectures": [
            "arm",
            "i586",
            "s390",
            "x86_64"
        ],
        "default_desktop": "KDE Plasma",
        "upgrade_style": "Stable",
        "init_system": "SysVinit",
        "experience_level": "Intermediate"
    },
    "10": {
        "id": "10",
        "name": "elementary OS",
        "logo": "https://elementary.io/images/icons/places/128/distributor-logo.svg",
        "description": "elementary OS is a Linux distribution based on Ubuntu and designed with a focus on simplicity, elegance, and user-friendliness. It features a custom desktop environment, Pantheon, which offers a clean and intuitive interface reminiscent of macOS. elementary OS provides a curated selection of applications, including the Epiphany web browser, Files file manager, and Music media player, all designed to integrate seamlessly with the desktop environment. Its AppCenter allows users to discover and install additional software easily. With its emphasis on aesthetics, consistency, and ease of use, elementary OS appeals to users seeking a polished and cohesive computing experience.",
        "release_year": 2011,
        "expert_rating": 7,
        "family": "Debian",
        "package_manager": "APT",
        "architectures": [
            "x86_64"
        ],
        "default_desktop": "Pantheon",
        "upgrade_style": "Stable",
        "init_system": "Systemd",
        "experience_level": "Beginner"
    },
    "11": {
        "id": "11",
        "name": "Void Linux",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Void_Linux_logo.svg/384px-Void_Linux_logo.svg.png",
        "description": "Void Linux is a rolling-release Linux distribution known for its simplicity, speed, and reliability. It features a lightweight base system and a package manager called XBPS, which simplifies software management and dependency resolution. Void Linux supports multiple architectures, including x86_64, ARM, and MIPS, catering to a wide range of hardware platforms. Its runit init system ensures fast boot times and efficient system management. Void Linux provides a range of desktop environments and window managers, allowing users to customize their computing experience to suit their preferences. With its focus on simplicity, performance, and user control, Void Linux offers a compelling alternative for users seeking a lightweight and efficient Linux distribution.",
        "release_year": 2008,
        "expert_rating": 7,
        "family": "Void",
        "package_manager": "XBPS",
        "architectures": [
            "aarch64",
            "armv6",
            "armv7",
            "i686",
            "x86_64"
        ],
        "default_desktop": "Xfce",
        "upgrade_style": "Rolling",
        "init_system": "runit",
        "experience_level": "Expert"
    },
    "12": {
        "id": "12",
        "name": "MX Linux",
        "logo": "https://mxlinux.org/wp-content/uploads/2023/05/MX-Menu-icon-pyramids.svg",
        "description": "MX Linux is a cooperative venture between the antiX and former MEPIS communities, using the best tools and talents from each distro. It is a midweight OS designed to combine an elegant and efficient desktop with simple configuration, high stability, solid performance, and medium-sized footprint. MX Linux relies on the excellent upstream work by Linux and the open-source community, deploying Xfce as its default desktop environment. It endeavors to be fast, lightweight, and energy-efficient without sacrificing the full-featured desktop environment. MX Linux also integrates various unique tools and features, such as MX Tools, which streamline common tasks for enhanced user convenience.",
        "release_year": 2014,
        "expert_rating": 7,
        "family": "Debian",
        "package_manager": "APT",
        "architectures": [
            "armhf",
            "i686",
            "x86_64"
        ],
        "default_desktop": "KDE Plasma",
        "upgrade_style": "Stable",
        "init_system": "SysVinit",
        "experience_level": "Beginner"
    },
    "13": {
        "id": "13",
        "name": "Alpine Linux",
        "logo": "https://www.alpinelinux.org/alpinelinux-logo.svg",
        "description": "Alpine Linux is a lightweight Linux distribution designed for security, simplicity, and resource efficiency. It features a minimalistic base system built around the musl libc and BusyBox utilities, resulting in a small footprint and fast boot times. Alpine Linux uses the apk package manager for software management, allowing users to easily install, upgrade, and remove packages. It follows a rolling-release model, ensuring that users have access to the latest software updates and security patches. Alpine Linux is commonly used in containerized environments and embedded systems due to its small size, security features, and ease of use.",
        "release_year": 2005,
        "expert_rating": 7,
        "family": "Alpine",
        "package_manager": "apk",
        "architectures": [
            "x86_64",
            "armhf",
            "armv7",
            "aarch64",
            "ppc64le",
            "s390x"
        ],
        "default_desktop": "None",
        "upgrade_style": "Stable",
        "init_system": "OpenRC",
        "experience_level": "Intermediate"
    },
    "14": {
        "id": "14",
        "name": "Kali Linux",
        "logo": "https://www.kali.org/images/kali-dragon-icon.svg",
        "description": "Kali Linux is a Debian-derived Linux distribution designed for digital forensics and penetration testing. It comes pre-installed with a wide range of tools used by cybersecurity professionals for vulnerability assessment, penetration testing, and digital forensics. Kali Linux provides a secure environment for conducting ethical hacking and security research, with features such as full disk encryption and stealth mode to protect users' privacy and anonymity. It follows a rolling-release model, ensuring that users have access to the latest security updates and tools. With its focus on security, Kali Linux is an essential tool for cybersecurity professionals and enthusiasts alike.",
        "release_year": 2006,
        "expert_rating": 9,
        "family": "Debian",
        "package_manager": "APT",
        "architectures": [
            "aarch64",
            "Apple M1",
            "armel",
            "i686",
            "x86_64"
        ],
        "default_desktop": "Xfce",
        "upgrade_style": "Rolling",
        "init_system": "Systemd",
        "experience_level": "Intermediate"
    },
    "15": {
        "id": "15",
        "name": "Pop!_OS",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pop_OS-Logo-nobg.svg/1200px-Pop_OS-Logo-nobg.svg.png",
        "description": "Pop!_OS is a Linux distribution developed by System76, a company that sells laptops and desktops pre-installed with Linux. It is based on Ubuntu and tailored specifically for System76 hardware, although it can be installed on other systems as well. Pop!_OS features a modern and polished desktop environment, with a focus on productivity and ease of use. It includes various customizations and enhancements, such as a tiling window manager, workspaces, and keyboard shortcuts for efficient multitasking. Pop!_OS offers seamless integration with System76 hardware, including firmware updates and driver support, making it an excellent choice for users seeking a hassle-free Linux experience.",
        "release_year": 2017,
        "expert_rating": 7,
        "family": "Debian",
        "package_manager": "APT",
        "architectures": [
            "aarch64",
            "x86_64"
        ],
        "default_desktop": "GNOME",
        "upgrade_style": "Stable",
        "init_system": "Systemd",
        "experience_level": "Beginner"
    },
    "16": {
        "id": "16",
        "name": "NixOS",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/NixOS_logo.svg/220px-NixOS_logo.svg.png",
        "description": "NixOS is a unique and innovative Linux distribution that takes a radically different approach to package management and system configuration. It is based on the Nix package manager and employs a declarative configuration model, allowing users to define their system configurations in a reproducible and composable manner. NixOS treats the entire system configuration as a single immutable entity, enabling atomic upgrades and rollbacks. Its purely functional approach to package management ensures that software installations are isolated, reproducible, and can coexist without conflicts. NixOS provides a high degree of flexibility and customization, allowing users to create custom system configurations tailored to their specific needs. With its emphasis on reproducibility, stability, and scalability, NixOS is a compelling choice for users seeking a modern and reliable Linux distribution.",
        "release_year": 2003,
        "expert_rating": 9,
        "family": "Nix",
        "package_manager": "Nix",
        "architectures": ["x86_64", "aarch64", "mips64el", "ppc64le"],
        "default_desktop": "None",
        "upgrade_style": "Rolling",
        "init_system": "Systemd",
        "experience_level": "Expert"
    }
}

current_id = 17

# FUNCTIONS

def select_unique(field):
    results = []
    for data_id in data:
        if data[data_id][field] not in results:
            results.append(data[data_id][field])

    if "None" in results:
        results.remove("None")
        results.insert(0, "None")

    return results

def get_others_same(search_key, entry):
    results = []
    for data_id in data:
        if entry[search_key] == data[data_id][search_key] and entry != data[data_id]:
            results.append({"id": data_id, "name": data[data_id]["name"]})
    return results

# ROUTES

@app.route('/')
def home():
   return render_template('home.html', data=data)

@app.route('/search_results/<search_term>')
def search_results(search_term):
    results = {}
    for data_id in data:
        in_name = search_term.casefold() in data[data_id]["name"].casefold()
        in_difficulty = search_term.casefold() in data[data_id]["experience_level"].casefold()
        in_architectures = search_term.casefold() in " ".join(data[data_id]["architectures"]).casefold()

        if in_name or in_difficulty or in_architectures:
            results[data_id] = data[data_id]
    return render_template('search_results.html', results=results, search_term=search_term)


@app.route('/view/<int:data_id>')
def view(data_id):
    data_id = str(data_id)
    global data
    entry = data[data_id]
    others_family = get_others_same("family", entry)
    others_difficulty = get_others_same("experience_level", entry)
    return render_template('view.html', entry=entry, others_family=others_family, others_difficulty=others_difficulty)

@app.route('/edit/<int:data_id>')
def edit(data_id):
    data_id = str(data_id)
    global data
    entry = data[data_id]
    return render_template('edit.html', 
        entry=entry, 
        family_options=select_unique("family"), 
        package_manager_options=select_unique("package_manager"),
        default_desktop_options=select_unique("default_desktop"), 
        upgrade_style_options=select_unique("upgrade_style"),
        init_system_options=select_unique("init_system")
        )

@app.route('/add')
def add():
    return render_template('add.html',
        family_options=select_unique("family"), 
        package_manager_options=select_unique("package_manager"),
        default_desktop_options=select_unique("default_desktop"), 
        upgrade_style_options=select_unique("upgrade_style"),
        init_system_options=select_unique("init_system")
        )

# AJAX FUNCTIONS

@app.route('/edit_data', methods=['GET', 'POST'])
def edit_data():
    global data

    json_data = request.get_json()  
    data_id = json_data["id"] 

    data[data_id] = json_data

    return jsonify(success=True)

@app.route('/add_data', methods=['GET', 'POST'])
def add_data():
    global data
    global current_id

    data_id = str(current_id)

    result_dict = {"id": data_id}
    json_data = request.get_json()
    for key in json_data:
        result_dict[key] = json_data[key]

    data[data_id] = result_dict
    current_id += 1

    return jsonify(id=data_id, name=data[data_id]["name"], success=True)


# DRIVER
if __name__ == '__main__':
   app.run(debug = True)




