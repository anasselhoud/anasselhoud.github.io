import type { Category, Skill } from '@/data/resume/skills';

interface SkillsProps {
  skills: Skill[];
  categories: Category[];
}

interface CategoryGroup {
  category: Category;
  skills: Skill[];
}

interface Track {
  name: string | undefined;
  groups: CategoryGroup[];
}

/**
 * Split categories into tracks (Technical vs. Strategy & Leadership),
 * preserving first-appearance order so the alphabetical `categories` array
 * (required by data tests) still yields Technical before Strategy for real
 * data. Categories without a `group` — as in component tests that pass
 * minimal mocks — collapse into a single untitled track.
 */
function groupByTrack(skills: Skill[], categories: Category[]): Track[] {
  const groupedByCategory: CategoryGroup[] = categories
    .map((category) => ({
      category,
      skills: skills.filter((skill) => skill.category === category.name),
    }))
    .filter((group) => group.skills.length > 0);

  const order: Array<string | undefined> = [];
  const buckets = new Map<string | undefined, CategoryGroup[]>();

  for (const group of groupedByCategory) {
    const key = group.category.group;
    if (!buckets.has(key)) {
      order.push(key);
      buckets.set(key, []);
    }
    buckets.get(key)?.push(group);
  }

  return order.map((name) => ({ name, groups: buckets.get(name) ?? [] }));
}

export default function Skills({ skills, categories }: SkillsProps) {
  const tracks = groupByTrack(skills, categories);

  return (
    <div className="skills">
      <div className="title">
        <h2>Skills</h2>
      </div>
      <div className="skill-tracks">
        {tracks.map(({ name, groups }) => (
          <div className="skill-track" key={name ?? 'default'}>
            {name && <div className="skill-track-title">{name}</div>}
            {groups.map(({ category, skills: categorySkills }) => (
              <div className="skill-group" key={category.name}>
                <h3 className="skill-group-title">{category.name}</h3>
                <ul className="skill-boxes">
                  {categorySkills.map((skill) => (
                    <li className="skill-box" key={skill.title}>
                      {skill.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
